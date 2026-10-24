import type { NextFunction, Request, RequestHandler, Response } from "express";

export const asyncRoute = (
  handler: (req: Request, res: Response) => Promise<void>,
): RequestHandler => (req, res, next: NextFunction) => {
  void handler(req, res).catch(next);
};
