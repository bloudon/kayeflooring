import { Router, type Request, type Response } from "express";
import fs from "node:fs/promises";
import path from "node:path";
import { logger } from "../lib/logger";

const router = Router();

const UPLOADS_DIR = process.env["UPLOADS_DIR"]
  ? path.resolve(process.env["UPLOADS_DIR"])
  : path.resolve(process.cwd(), "uploads");

const FULL_DIR  = path.join(UPLOADS_DIR, "full");
const THUMB_DIR = path.join(UPLOADS_DIR, "thumb");

// Public gallery listing — only exposes what's in the uploads folder
router.get("/photos", async (_req: Request, res: Response): Promise<void> => {
  try {
    let files: string[] = [];
    try {
      files = await fs.readdir(FULL_DIR);
    } catch {
      // uploads dir doesn't exist yet — return empty list gracefully
    }

    const photos = files
      .filter((f) => f.endsWith(".jpg"))
      .map((f) => {
        const id = f.replace(".jpg", "");
        return { id, full: `/api/uploads/full/${f}`, thumb: `/api/uploads/thumb/${f}` };
      });

    res.json(photos);
  } catch (err) {
    logger.error({ err }, "Failed to list photos");
    res.status(500).json({ error: "Failed to list photos" });
  }
});

export { THUMB_DIR };
export default router;
