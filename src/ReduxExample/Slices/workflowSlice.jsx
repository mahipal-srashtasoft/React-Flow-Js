import { createSlice } from "@reduxjs/toolkit";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

const initialState = {
  sidePopupShow: false,
  trigger: { label: "Trigger", icon: faBolt },
  actions: {},
  nodes: [
    {
      id: "1",
      type: "customNode",
      data: { label: "Trigger", nodeNo: 1 },
      position: { x: 250, y: 5 },
    },
    {
      id: "2",
      type: "customNode",
      data: { label: "Action", nodeNo: 2 },
      position: { x: 250, y: 150 },
    },
    // {
    //   id: "3",
    //   type: "customNode",
    //   data: { label: "Action", nodeNo: 3 },
    //   position: { x: 250, y: 300 },
    // },
  ],
  edges: [
    { id: "e1-2", source: "1", target: "2" },
    // { id: "e2-3", source: "2", target: "3" },
  ],
  idCounter: 2,
  isPopupOpen: false,
  isTriggerPopup: false,
  selectedNodeId: null,
  popupContent: null,
};

const workflowSlice = createSlice({
  name: "workflow",
  initialState,
  reducers: {
    setSidePopupShow: (state, action) => {
      console.log("first", action.payload);
      state.sidePopupShow = action.payload;
    },
    setTrigger: (state, action) => {
      state.trigger = action.payload;
    },
    addNode: (state, action) => {
      console.log(action, "AAAAA");
      const { parentId, newNode } = action.payload;
      const parentNode = state.nodes.find((node) => node.id === parentId);
      if (!parentNode) return;
      const lastNodePositionY = parentNode.position.y || 0;

      newNode.position = { x: 250, y: lastNodePositionY + 150 };
      state.nodes.push(newNode);
      state.idCounter += 1;
      state.actions[newNode.id] = { label: "Action", icon: faBolt };

      const newEdge = {
        id: `e${parentId}-${newNode.id}`,
        source: parentId,
        target: newNode.id,
      };
      state.edges.push(newEdge);
    },
    updateTriggerNode: (state, action) => {
      state.trigger = action.payload;
      state.isTriggerPopup = false;
      state.sidePopupShow = true;
    },
    updateActionNode: (state, action) => {
      const { nodeId, label, icon } = action.payload;
      state.actions[nodeId] = { label, icon };
      state.isPopupOpen = false;
    },
    setPopupState: (state, action) => {
      state.isPopupOpen = action.payload.isPopupOpen;
      state.isTriggerPopup = action.payload.isTriggerPopup;
      state.selectedNodeId = action.payload.selectedNodeId;
      state.popupContent = action.payload.popupContent;
    },
  },
});

export const {
  setSidePopupShow,
  setTrigger,
  addNode,
  updateTriggerNode,
  updateActionNode,
  setPopupState,
} = workflowSlice.actions;

export default workflowSlice.reducer;