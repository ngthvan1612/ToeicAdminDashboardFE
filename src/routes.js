import React from "react";

// TEST
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
const ToeicSingleQuestion = React.lazy(() =>
  import("./views/tests/ToeicSingleQuestion")
);
const BackupToeicFullTest = React.lazy(() =>
  import("./views/tests/BackupToeicFullTest")
)

// VOCABULARY
const ToeicListVocabTopics = React.lazy(() =>
  import("./views/vocabs/ToeicListVocabTopics")
)

const ToeicListWordsByTopic = React.lazy(() =>
  import("./views/vocabs/ToeicListWordsByTopic")
)

const ToeicWordDetail = React.lazy(() =>
  import("./views/vocabs/ToeicWordDetail")
)

const testRoutes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/test-manager/tests", element: ToeicFullTest },
  { path: "/test-manager/tests/backup", element: BackupToeicFullTest },
  {
    path: "/test-manager/tests/:toeicFullTestId/group",
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
    path: "/test-manager/tests/:toeicFullTestId/group/:partId",
    element: ToeicFullTestViewPart,
  },
  {
    path: "/test-manager/tests/:toeicFullTestId/group/:partId/questions",
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
  {
    path: "/test-manager/tests/:toeicFullTestId/group/:partId/questions/:questionId",
    element: ToeicSingleQuestion,
  },
];

const vocabRoutes = [
  { path: '/vocab-manager/topics', element: ToeicListVocabTopics },
  { path: '/vocab-manager/topics/:topicId', element: ToeicListWordsByTopic },
  { path: '/vocab-manager/topics/:topicId/words/:wordId', element: ToeicWordDetail }
]

export default [...testRoutes, ...vocabRoutes];
