import { Router, type Request, type Response, type NextFunction } from "express";
import multer from "multer";
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { logger } from "../lib/logger";

const router = Router();

// ── Upload directory setup ────────────────────────────────────────────────────
const UPLOADS_DIR = process.env["UPLOADS_DIR"]
  ? path.resolve(process.env["UPLOADS_DIR"])
  : path.resolve(process.cwd(), "uploads");

const FULL_DIR  = path.join(UPLOADS_DIR, "full");
const THUMB_DIR = path.join(UPLOADS_DIR, "thumb");

async function ensureDirs() {
  await fs.mkdir(FULL_DIR,  { recursive: true });
  await fs.mkdir(THUMB_DIR, { recursive: true });
}
ensureDirs().catch((err) => logger.error({ err }, "Failed to create upload dirs"));

// ── Auth middleware ───────────────────────────────────────────────────────────
function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (req.session?.admin) { next(); return; }
  res.status(401).json({ error: "Unauthorized" });
}

// ── Multer (memory storage — Sharp processes buffer) ─────────────────────────
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB raw cap
  fileFilter(_req, file, cb) {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are accepted"));
  },
});

// ── Auth routes ───────────────────────────────────────────────────────────────
router.post("/admin/login", (req: Request, res: Response): void => {
  const { password } = req.body as { password?: string };
  const adminPass = process.env["ADMIN_PASSWORD"];
  if (!adminPass) {
    res.status(500).json({ error: "ADMIN_PASSWORD not configured" });
    return;
  }
  if (!password || password !== adminPass) {
    res.status(401).json({ error: "Incorrect password" });
    return;
  }
  req.session.admin = true;
  res.json({ success: true });
});

router.post("/admin/logout", (req: Request, res: Response): void => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

router.get("/admin/check", (req: Request, res: Response): void => {
  res.json({ authed: !!req.session?.admin });
});

// ── Photo listing (admin — returns full metadata) ────────────────────────────
router.get("/admin/photos", requireAdmin, async (_req: Request, res: Response): Promise<void> => {
  try {
    await ensureDirs();
    const files = await fs.readdir(FULL_DIR);
    const photos = files
      .filter((f) => f.endsWith(".jpg"))
      .map((f) => {
        const id = f.replace(".jpg", "");
        return { id, full: `/api/uploads/full/${f}`, thumb: `/api/uploads/thumb/${f}` };
      });
    res.json(photos);
  } catch (err) {
    logger.error({ err }, "Failed to list admin photos");
    res.status(500).json({ error: "Failed to list photos" });
  }
});

// ── Upload ────────────────────────────────────────────────────────────────────
router.post(
  "/admin/photos/upload",
  requireAdmin,
  upload.array("photos", 50),
  async (req: Request, res: Response): Promise<void> => {
    const files = req.files as Express.Multer.File[] | undefined;
    if (!files || files.length === 0) {
      res.status(400).json({ error: "No files provided" });
      return;
    }

    const results: { id: string; full: string; thumb: string }[] = [];

    for (const file of files) {
      try {
        const id = randomUUID();
        const filename = `${id}.jpg`;

        // Full-size: max 1920px wide, JPEG 85%
        await sharp(file.buffer)
          .resize({ width: 1920, withoutEnlargement: true })
          .jpeg({ quality: 85, mozjpeg: true })
          .toFile(path.join(FULL_DIR, filename));

        // Thumbnail: max 600px wide, JPEG 80%
        await sharp(file.buffer)
          .resize({ width: 600, withoutEnlargement: true })
          .jpeg({ quality: 80, mozjpeg: true })
          .toFile(path.join(THUMB_DIR, filename));

        results.push({ id, full: `/api/uploads/full/${filename}`, thumb: `/api/uploads/thumb/${filename}` });
        logger.info({ id, originalName: file.originalname }, "Photo uploaded & processed");
      } catch (err) {
        logger.error({ err, name: file.originalname }, "Failed to process uploaded photo");
      }
    }

    res.json({ uploaded: results });
  },
);

// ── Delete ────────────────────────────────────────────────────────────────────
router.delete("/admin/photos/:id", requireAdmin, async (req: Request, res: Response): Promise<void> => {
  const id = String(req.params["id"] ?? "");
  // Basic safety: id must be a UUID
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    res.status(400).json({ error: "Invalid photo id" });
    return;
  }
  try {
    await Promise.allSettled([
      fs.unlink(path.join(FULL_DIR, `${id}.jpg`)),
      fs.unlink(path.join(THUMB_DIR, `${id}.jpg`)),
    ]);
    res.json({ success: true });
  } catch (err) {
    logger.error({ err, id }, "Failed to delete photo");
    res.status(500).json({ error: "Failed to delete photo" });
  }
});

export default router;
export { UPLOADS_DIR };
