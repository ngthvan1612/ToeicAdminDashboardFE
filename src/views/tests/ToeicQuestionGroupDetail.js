import { CCard, CCardHeader, CCardBody, CSpinner, CContainer, CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell, CButton, CModal, CModalHeader, CModalTitle, CModalBody, CForm, CFormLabel, CFormInput, CModalFooter, CRow, CListGroup } from "@coreui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getToeicQuestionGroupById } from "src/api/toeicQuestionGroup";
import { resolveBackendUrl } from "src/api/axios";


const ResolveToeicItemContent = ({ item }) => {
  if (item.type == "AUDIO") {
    return (
      <audio controls preload="none">
        <source src={resolveBackendUrl(item.storageViewUrl)} />
      </audio>
    )
  }
  if (item.type == "IMAGE") {
    return (
      <img
        src={resolveBackendUrl(item.storageViewUrl)}
        style={{
          maxHeight: 200
        }}
      />
    )
  }
  return <></>
}

const HTMLEditor = (props) => {
  const testContent = props.testContent ?? '';
  return (
    <>
      <div dangerouslySetInnerHTML={{
        __html: testContent
      }} />
    </>
  )
}

const AddResourceModal = (props) => {
  const [visible, setVisible] = useState(false);
  const testContent = props.testContent;

  return (
    <>
      <CButton size="sm" color="success" className="text-white" onClick={() => setVisible(!visible)}>Add topic</CButton>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Add topic</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            onSubmit={(e) => handleCreateTopic(e)}
          >
            <HTMLEditor />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => handleCreateTopic(null)}>Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

const ChoiceModal = (props) => {
  const {choice} = props;
  const removeChoice = () => {
      if (typeof(props.onChoiceDelete) === 'function') {
          props.onChoiceDelete();
      }
  };

  return (
    <>
    <CTableRow>
          <CFormLabel>{choice.label}. {choice.content}</CFormLabel>
          {/* <CButton onClick={() => removeChoice()}>Delete</CButton> */}
          <CButton size="sm" color="danger" style={{float: 'right'}} onClick={() => removeChoice()}>Delete</CButton>
          </CTableRow>
    </>
  )
}

const AddQuestionModal = (props) => {
  const [visible, setVisible] = useState(false);
  const testContent = props.testContent;
  const [questionNumber, setQuestionnumber] = useState(0);
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [choices, setChoices] = useState([]); // [{label: 'A', content: 'How are you?'}
  const [label, setLabel] = useState('');
  const [content, setContent] = useState('');

  const handleCreateQuestion = (e) => {
    if (e) {
      e.preventDefault();
    }
  
    if (!questionNumber.toString.trim()) {
      alert('Question number cannot be null');
      return;
    }
  
    if (!correctAnswer.toString.trim()) {
      alert('correct answer cannot be null');
      return;
    }
  }

  function fetchlistChoice() {
    console.log(choices);
    return choices;
  }

  function removeChoice(choiceToRemove) {
    const newChoices = choices.filter((choice) => choice != choiceToRemove);
    setChoices(newChoices);
  }

  function addChoice() {
    const newChoice = {
      label: label,
      content: content
    }
    setChoices([...choices, newChoice]);
  }

  useEffect(() => {
    fetchlistChoice();
  }, [choices]);

  return (
    <>
      <CButton size="sm" color="success" className="text-white" onClick={() => setVisible(!visible)}>Add question</CButton>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Add question</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            onSubmit={(e) => handleCreateQuestion(e)}
          >
            <div className="mb-3">
              <CFormLabel>Question number</CFormLabel>
              <CFormInput
                type="text"
                placeholder="10"
                onChange={(e) => setQuestionnumber(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Question</CFormLabel>
              <CFormInput
                type="text"
                placeholder="10"
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Corect Answer</CFormLabel>
              <CFormInput
                type="text"
                placeholder="A"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Choice</CFormLabel>
              <div>
                <CTable>
                  <CTableBody>
                {choices.map((choice) => {
                return <ChoiceModal onChoiceDelete={() => {
                  removeChoice(choice);
                }} choice={choice} />;
              })}
              </CTableBody>
              </CTable>
              </div>
              <CFormInput
                type="text"
                placeholder="Label"
                onChange={(e) => setLabel(e.target.value)}
              />
              <CFormInput
                type="text"
                placeholder="Content"
                style={{ marginTop: 10 }}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <CButton color="success" onClick={() => addChoice()}>
              Add Choice
            </CButton>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => handleCreateQuestion(null)}>Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

const ToeicSingleQuestion = () => {
  const params = useParams();
  const [questionGroup, setQuestionGroup] = useState();
  const [cardData, setCardData] = useState({
    title: ''
  })

  const questionGroupId = params.questionGroupId;

  useEffect(() => {
    getToeicQuestionGroupById(questionGroupId)
      .then(resp => {
        const questionGroupRaw = resp.data.data;
        console.log(questionGroupRaw);

        setQuestionGroup({
          ...questionGroupRaw
        });

        setCardData({
          ...cardData,
          title: questionGroupRaw.questions.map(u => u.questionNumber).join(" ")
        })
      })
      .catch(err => alert(err.response.data.message));
  }, []);
  if (!questionGroup) {
    return <><CSpinner /> Loading...</>;
  }
  return (
    <>
      <CCard className="mb-3">
        <CCardHeader>Question group content</CCardHeader>
        <CCardBody>
          <CTable className="align-middle text-center">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Content Type</CTableHeaderCell>
                <CTableHeaderCell>Content</CTableHeaderCell>
                <CTableHeaderCell>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {questionGroup.questionContents?.map((content, order) => {
                return (
                  <CTableRow>
                    <CTableDataCell className="col-md-auto">{order + 1}</CTableDataCell>
                    <CTableDataCell>{content.type}</CTableDataCell>
                    <CTableDataCell><ResolveToeicItemContent item={content} /></CTableDataCell>
                    <CTableDataCell>
                      <CButton size="sm" color="danger" className="text-white">Delete</CButton>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
          <div className="mb-3">
            <div className="text-center">
              <AddResourceModal

              />
            </div>
          </div>
        </CCardBody>
      </CCard>
      <CCard className="mb-3">
        <CCardHeader>Question group transcript</CCardHeader>
        <CCardBody>
          <CTable className="align-middle text-center">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Content Type</CTableHeaderCell>
                <CTableHeaderCell>Content</CTableHeaderCell>
                <CTableHeaderCell>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {questionGroup.transcripts?.map((content, order) => {
                return (
                  <CTableRow>
                    <CTableDataCell className="col-md-auto">{order + 1}</CTableDataCell>
                    <CTableDataCell>{content.type}</CTableDataCell>
                    <CTableDataCell>{content.content?.substring(0, 30)}...</CTableDataCell>
                    <CTableDataCell>
                      <CButton size="sm" color="danger" className="text-white">Delete</CButton>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
          <div className="mb-3">
            <div className="text-center">
              <AddResourceModal

              />
            </div>
          </div>
        </CCardBody>
      </CCard>
      {questionGroup.questions?.map(question => {
        return (
          <CCard className="mb-3">
            <CCardHeader>Question {question.questionNumber}</CCardHeader>
            <CCardBody>
              Question: <b>{question.content}</b><br />
              Choices: <br />
              <ul class="list-group list-group-flush">
                {question.choices.map(choice => {
                  if (choice.label == question.correctAnswer) {
                    return (
                      <li class="list-group-item">
                        <span className="text-success fw-bolder">
                          <b>{choice.label}</b>. {choice.content}<br />
                        </span>
                        <i>Explain: <b>{choice.explain}</b></i>
                      </li>
                    )
                  }
                  else {
                    return (
                      <li class="list-group-item">
                        <span className="">
                          <b>{choice.label}</b>. {choice.content}<br />
                        </span>
                        <i>Explain: <b>{choice.explain}</b></i>
                      </li>
                    )
                  }
                })}
              </ul>
            </CCardBody>
          </CCard>
        )
      })}
      
      <div className="mb-3">
          <div className="text-center">
            <AddQuestionModal
            />
          </div>
        </div>
    </>
  );
  
};
export default ToeicSingleQuestion;
