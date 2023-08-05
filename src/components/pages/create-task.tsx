import { useState } from "react";
import { Box, Button, FormControl, styled, TextField, Typography } from "@mui/material";
import { ListType, TaskType } from "./list-tasks";
import { v4 as uuidv4 } from 'uuid';

const CreateTask = () => {
  const [taskName, setTaskName] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);

  const handleSubmit = () => {
    let list: ListType = {};
    const taskList: TaskType = localStorage.getItem("taskList");
    if(taskList) {
      list = JSON.parse(taskList);
    }
    list[uuidv4()] = taskName;
    localStorage.setItem("taskList", JSON.stringify(list));
    window.location.href = "/list-tasks";
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const taskName: string = event.target.value;
    setTaskName(taskName);
    if(taskName.length) setDisabled(false);
    else setDisabled(true);
  }

  return (
    <>
      <FormTitle>Please Enter Task</FormTitle>
      <FormWrapper>
        <FormControl fullWidth variant="outlined">
          <TaskName
            name="taskName"
            label="Enter Task Name"
            variant="outlined"
            onChange={onChange}
            value={taskName}
            required
          />
          <SubmitButton onClick={handleSubmit} type="submit" variant="contained" disabled={disabled}>
            Submit
          </SubmitButton>
        </FormControl>
      </FormWrapper>
    </>
  );
};

const FormTitle = styled(Typography)(() => ({
  fontSize: "25px",
  padding: "0 500px",
  display: "flex",
  justifyContent: "center",
  paddingTop: "100px",
}));

const FormWrapper = styled(Box)(() => ({
  padding: "0 500px",
  display: "flex",
  justifyContent: "center",
  paddingTop: "20px",
}));

const TaskName = styled(TextField)(() => ({
  marginBottom: "20px"
}));

const SubmitButton = styled(Button)(() => ({
    backgroundColor: "#4caf50",
    color: "white",
    "&:hover": {
      backgroundColor: "#45a049",
    }
}));

export default CreateTask;
