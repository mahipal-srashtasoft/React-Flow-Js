import "./App.css";
import "@xyflow/react/dist/style.css";
import Demo from "./Components/demo";
import Flow from "./Components/CustomeEdge/Flow";
import FlowWithForms from "./Components/Demo Example/FlowWithForms";
import Workflow from "./Components/zapier demo/Workflow";
import WorkflowRedux from "./ReduxExample/Components/Workflow";
// import Flow from "./Components/Flow";

function App() {
  return (
    <>
      {/* <Flow /> */}
      {/* <Demo /> */}

      {/* Custome Edge */}
      {/* <Flow /> */}

      {/* Form Demo Example */}
      {/* <FlowWithForms /> */}

      {/* Workflow Like Zepier */}
      {/* <Workflow /> */}

      {/* Workflow Like Zepier with redux toolkit */}
      <WorkflowRedux />
    </>
  );
}

export default App;
