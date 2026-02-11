import { Hono } from "hono";
import { getArts, getArtById, createArt, updateArtById, deleteArt, uploadArtImage} from "../controllers/art.controller";

const artRouter = new Hono();

artRouter.get("/", getArts);
artRouter.get("/:id", getArtById);
artRouter.post("/", createArt);
artRouter.put("/:id", updateArtById);
artRouter.delete("/:id", deleteArt);
artRouter.post("/:id/image", uploadArtImage);

export default artRouter;