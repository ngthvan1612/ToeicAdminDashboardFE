import { CCard, CCardHeader, CCardBody, CSpinner, CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell, CButton, CModal, CModalHeader, CModalTitle, CModalBody, CForm, CFormLabel, CFormInput, CModalFooter, CRow, CListGroup, CNavGroup } from "@coreui/react";
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

const ResolveToeicItemContentType = (props) => {
  const { type } = props;
  if (type == "AUDIO") {
    return (
      <input type="file" />
    )
  } else if (type == "IMAGE") {
    return (
      <input type="file" />
    )
  } else if (type == "HTML") {
    return (
      <textarea style={{ width: "200%", height: "200px" }}/>
    )
  } else {
    return <></>
  }
}

const AddGroupContent = (props) => {
  const [visible, setVisible] = useState(false);
  const testContent = props.testContent;
  const  [type, setType] = useState('');

  useEffect(() => {
    setType('AUDIO');
  }, []);

  function onChangeType (typeSelect) {
    setType(typeSelect);
    console.log(typeSelect);
  }

  const handleCreateResource = (e) => {
    if (e) {
      e.preventDefault();
    }
  }

  return (
    <>
      <CButton size="sm" color="success" className="text-white" onClick={() => setVisible(!visible)}>Add group content</CButton>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Add group content</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            onSubmit={(e) => handleCreateResource(e)}
          >
            <CTableRow>
              <CFormLabel htmlFor="topic">Type</CFormLabel>
              <select style={{ marginLeft: "10px" }} selected={''} onChange={(e) => onChangeType(e.target.value)}>
                <option value="AUDIO">Audio</option>
                <option value="IMAGE">Image</option>
                <option value="HTML">HTML</option>
              </select>
            </CTableRow>
            <CTableRow>
              <CFormLabel htmlFor="topic" style={{ marginRight: "10px" }}>Content</CFormLabel>
              <ResolveToeicItemContentType type={type} />
            </CTableRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => handleCreateResource(null)}>Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

const AddGroupTranscript = (props) => {
  const [visible, setVisible] = useState(false);
  const testContent = props.testContent;
  const  [type, setType] = useState('');

  useEffect(() => {
    setType('AUDIO');
  }, []);

  function onChangeType (typeSelect) {
    setType(typeSelect);
    console.log(typeSelect);
  }

  const handleCreateResource = (e) => {
    if (e) {
      e.preventDefault();
    }
  }

  return (
    <>
      <CButton size="sm" color="success" className="text-white" onClick={() => setVisible(!visible)}>Add group transcript</CButton>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Add group transcript</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            onSubmit={(e) => handleCreateResource(e)}
          >
            <CTableRow>
              <CFormLabel htmlFor="topic">Type</CFormLabel>
              <select style={{ marginLeft: "10px" }} selected={''} onChange={(e) => onChangeType(e.target.value)}>
                <option value="AUDIO">Audio</option>
                <option value="IMAGE">Image</option>
                <option value="HTML">HTML</option>
              </select>
            </CTableRow>
            <CTableRow>
              <CFormLabel htmlFor="topic" style={{ marginRight: "10px" }}>Content</CFormLabel>
              <ResolveToeicItemContentType type={type} />
            </CTableRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => handleCreateResource(null)}>Save changes</CButton>
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
          <CFormLabel>{choice.label}. {choice.content} (Explain: {choice.explain})</CFormLabel>
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
  const [explain, setExplain] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [choices, setChoices] = useState([]); 
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
      content: content,
      explain: explain
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
              <CFormInput
                type="text"
                placeholder="Explain"
                style={{ marginTop: 10 }}
                onChange={(e) => setExplain(e.target.value)}
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
              <AddGroupContent

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
              <AddGroupTranscript

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
