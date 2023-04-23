import React from "react";

const ToeicFullTest = React.lazy(() => import("./views/tests/ToeicFullTest"));
const ToeicFullTestAllParts = React.lazy(() =>
  import("./views/tests/ToeicFullTestAllParts")
);
const CreateToeicFullTest = React.lazy(() =>
  import("./views/tests/CreateToeicFullTest")
);
const UpdateToeicFullTest = React.lazy(() =>
  import("./views/tests/UpdateToeicFullTest")
);
const Statistics = React.lazy(() => import("./views/pages/Statistics"));
const ToeicFullTestViewListParts = React.lazy(() =>
  import("./views/tests/ToeicFullTestViewListParts")
);
const ToeicFullTestViewPart = React.lazy(() =>
  import("./views/tests/ToeicFullTestViewPart")
);
const ToeicFullTestViewPartQuestions = React.lazy(() =>
  import("./views/tests/ToeicFullTestViewPartQuestions")
);
const Modal = React.lazy(() => {
  import("./views/notifications/modals/Modals");
});

const toeicRoutes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/test-manager/tests", element: ToeicFullTest },
  {
    path: "/test-manager/tests/:toeicFullTestId/collections",
    element: ToeicFullTestAllParts,
  },

  { path: "/test-manager/tests/create", element: CreateToeicFullTest },
  {
    path: "/test-manager/tests/update/:toeicFullTestId",
    element: UpdateToeicFullTest,
  },
  {
    path: "/test-manager/tests/:toeicFullTestId",
    element: ToeicFullTestViewListParts,
  },
  {
    path: "/test-manager/tests/:toeicFullTestId/collections/:partId",
    element: ToeicFullTestViewPart,
  },
  {
    path: "/test-manager/tests/:toeicFullTestId/collections/:partId/questions",
    element: ToeicFullTestViewPartQuestions,
  },
  {
    path: "/statistics",
    element: Statistics,
  },
  {
    path: "/modal",
    element: Modal,
  },
];

export default toeicRoutes;