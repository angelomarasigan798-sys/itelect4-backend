import { Router, type Request, type Response, type NextFunction, type RequestHandler } from "express";
import { AppointmentModel } from "../models/Appointment";
import { requireAuth } from "../middleware/auth";
import type { NewAppointmentBody } from "../types/index";

export const appointmentRouter = Router();

appointmentRouter.use(requireAuth);

interface IdParam {
  id: string;
}

const asyncRoute = (
  handler: (req: Request, res: Response) => Promise<void>,
): RequestHandler => (req, res, next: NextFunction) => {
  void handler(req, res).catch(next);
};

appointmentRouter.get(
  "/",
  asyncRoute(async (req, res) => {
    const appointments = await AppointmentModel.find({ userId: req.userId })
      .sort({ appointmentDate: 1, appointmentTime: 1 });
    res.json(appointments);
  }),
);

appointmentRouter.get(
  "/:id",
  asyncRoute(async (req, res) => {
    const appointment = await AppointmentModel.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!appointment) {
      res.status(404).json({ message: "Appointment not found" });
      return;
    }

    res.json(appointment);
  }),
);

appointmentRouter.post(
  "/",
  asyncRoute(async (req: Request<unknown, unknown, NewAppointmentBody>, res) => {
    const appointment = await AppointmentModel.create({
      ...req.body,
      userId: req.userId,
    });
    res.status(201).json(appointment);
  }),
);

appointmentRouter.patch(
  "/:id",
  asyncRoute(async (req, res) => {
    const appointment = await AppointmentModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true },
    );

    if (!appointment) {
      res.status(404).json({ message: "Appointment not found" });
      return;
    }

    res.json(appointment);
  }),
);

appointmentRouter.delete(
  "/:id",
  asyncRoute(async (req, res) => {
    const appointment = await AppointmentModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!appointment) {
      res.status(404).json({ message: "Appointment not found" });
      return;
    }

    res.status(204).send();
  }),
);