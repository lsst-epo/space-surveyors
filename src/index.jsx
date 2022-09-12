import "regenerator-runtime";
import React from "react";
import "@lib/i18n";
import GlobalStyles from "@styles/globalStyle";
import { SpaceSurveyors } from "./space-surveyors";

export default () => (
  <>
    <GlobalStyles />
    <SpaceSurveyors></SpaceSurveyors>
  </>
);
