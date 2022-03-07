import { useState } from 'react';
import { Input, Text, Button, Row, Column, List } from 'components';

export const Home = () => {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState<{ label: string }[]>([]);

  const handleOK = () => {
    if (!taskName) {
      return;
    }

    setTasks((previous) => {
      const copy = [...previous];
      copy.push({ label: taskName });
      return copy;
    });
    setTaskName('');
  };

  return (
    <Column width="680px" margin="0 auto">
      <Text fontSize="bodyLarge" fontWeight="bold" my="10px" pl="10px">
        Home
      </Text>
      <Row width="100%">
        <Input
          flex={1}
          value={taskName}
          placeholder="Enter a task name here..."
          onChange={(e) => setTaskName(e.target.value)}
        />
        <Button onClick={handleOK}>OK</Button>
      </Row>

      <List items={tasks} />
    </Column>
  );
};
