// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import EnterOtpPage from "../pages/EnterOtpPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import EventsListPage from "../pages/EventsListPage";
import UserDashboardPage from "../pages/UserDashboardPage";
import BookTicketPage from "../pages/BookTicketPage";
import OrganizerDashboardPage from "../pages/OrganizerDashboardPage";
import ManageEventsPage from "../pages/ManageEventsPage";
import CreateEventPage from "../pages/CreateEventPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/enter-otp" element={<EnterOtpPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/events" element={<EventsListPage />} />
      <Route path="/user/dashboard" element={<UserDashboardPage />} />
      <Route path="/book/:eventId" element={<BookTicketPage />} />
      <Route path="/organizer/dashboard" element={<OrganizerDashboardPage />} />
      <Route path="/manage-events" element={<ManageEventsPage />} />
      <Route path="/create-event" element={<CreateEventPage />} />
    </Routes>
  );
};

export default AppRoutes;