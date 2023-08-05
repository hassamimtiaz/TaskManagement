import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Checkbox, Typography, styled } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import { ListType, TaskType } from "./list-tasks";

const BulkDelete = () => {
  const [taskList, setTaskList] = useState<ListType>({});
  const [removeTasks, setRemoveTasks] = useState<string[]>([]);

  useEffect(() => {
    const list: TaskType = localStorage.getItem("taskList");
    if(list) {
      setTaskList(JSON.parse(list));
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const value = event.target.value;
    setRemoveTasks((prevList: string[]) => {
      if (isChecked && !prevList.includes(value)) {
        return [...prevList, value];
      }
      if (!isChecked) {
        return prevList.filter((item: string) => item !== value);
      }
      return prevList;
    });
  }

  const deleteTasks = () => {
    if(Object.keys(taskList).length) {
      const filteredObj = Object.fromEntries(
        Object.entries(taskList).filter(([key]) => !removeTasks.includes(key))
      );
      localStorage.setItem("taskList", JSON.stringify(filteredObj));
      setTaskList(filteredObj);
      setRemoveTasks([]);
    }
  }

  return (
    <>
      <TaskListTitle>Select Tasks to delete</TaskListTitle>
      <ListWrapper>
        {
          Object.keys(taskList).map((item: string) => (
            <TaskCard key={uuidv4()} variant="outlined">
              <Checkbox
                checked={removeTasks.includes(item)}
                color="success"
                onChange={handleChange}
                value={item}
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  { taskList[item] }
                </Typography>
              </CardContent>
            </TaskCard>
          ))
        }
        {
          Object.keys(taskList).length === 0 &&
          <Typography>No List Found</Typography>
        }
        <SubmitButton fullWidth onClick={deleteTasks} type="submit" variant="contained" disabled={removeTasks.length ? false : true}>
          Delete
        </SubmitButton>
      </ListWrapper>
    </>
  );
}

const TaskListTitle = styled(Typography)(() => ({
  display: "flex",
  fontSize: "25px",
  justifyContent: "center",
  padding: "0 500px",
  paddingTop: "30px",
}));

const TaskCard = styled(Card)(() => ({
  display: "flex",
  marginBottom: "10px",
}));

const ListWrapper = styled(Box)(() => ({
  justifyContent: "center",
  padding: "0 400px",
  paddingTop: "20px",
}));

const SubmitButton = styled(Button)(() => ({
  backgroundColor: "#4caf50",
  color: "white",
  "&:hover": {
    backgroundColor: "#45a049",
  }
}));

export default BulkDelete;
