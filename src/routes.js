import React from "react";

const ToeicFullTest = React.lazy(() => import("./views/tests/ToeicFullTest"));
const CreateToeicFullTest = React.lazy(() =>
  import("./views/tests/CreateToeicFullTest")
);
const UpdateToeicFullTest = React.lazy(() =>
  import("./views/tests/UpdateToeicFullTest")
);
const Witgets = React.lazy(() => import("./views/widgets/Widgets"));
const WitgetsBrand = React.lazy(() => import("./views/widgets/WidgetsBrand"));
const WitgetsDropdown = React.lazy(() =>
  import("./views/widgets/WidgetsDropdown")
);

const ToeicFullTestViewListParts = React.lazy(() =>
  import("./views/tests/ToeicFullTestViewListParts")
);

const toeicRoutes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/test-manager/tests", element: ToeicFullTest },
  { path: "/test-manager/tests/create", element: CreateToeicFullTest },
  {
    path: "/test-manager/tests/update/:toeicFullTestId",
    element: UpdateToeicFullTest,
  },
  {
    path: "/test-manager/tests/:toeicFullTestId",
    element: ToeicFullTestViewListParts,
  },
  { path: "/test-manager/statistics", element: Witgets },
  { path: "/test-manager/statistics/brand", element: WitgetsBrand },
  { path: "/test-manager/statistics/dropdown", element: WitgetsDropdown },
];

export default toeicRoutes;
