import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, styled } from "@mui/material";

export type ListType = {
  [key: string]: string;
};
export type TaskType = string | null;

export const ListTasks = () => {
  const [taskList, setTaskList] = useState<ListType>({});

  useEffect(() => {
    const list: TaskType = localStorage.getItem("taskList");
    if(list) {
      setTaskList(JSON.parse(list));
    }
  }, []);

  return (
    <>
      <TaskListTitle>List of Tasks</TaskListTitle>
      <ListWrapper>
      {
        Object.keys(taskList).map((item: string) => (
          <TaskCard key={item} variant="outlined">
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
      </ListWrapper>
    </>
  );
}

const TaskListTitle = styled(Typography)(() => ({
  fontSize: "25px",
  padding: "0 500px",
  display: "flex",
  justifyContent: "center",
  paddingTop: "30px",
}));

const TaskCard = styled(Card)(() => ({
  marginBottom: "10px",
}));

const ListWrapper = styled(Box)(() => ({
  padding: "0 400px",
  justifyContent: "center",
  paddingTop: "20px",
}));
