import { Router } from "express";

const accountRouter = Router();

accountRouter.get("/:user/points", async (req, res) => {
  try {
    const user = req.params;
    res.json(user);
  } catch (e) {
    console.error(e.message);
  }
});

export default accountRouter;
