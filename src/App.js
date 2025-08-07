import "./App.css";
// import Traffic from "./components/Traffic";
// import { config } from "./config/data";
// import GridLight from "./components/GridLight";
import Debounce from "./components/Debounce";
import NestedComments from "./components/nested-comments";
import commentsData from "./data/comments.json";
import "./components/styles.css";

function App() {
  return (
    <>
      {/* <div className="wrapper">
      <Traffic config={config} />
    </div> */}
      {/* <GridLight /> */}
      {/* <Debounce /> */}
      <NestedComments
        comments={commentsData}
        onSubmit={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </>
  );
}

export default App;
