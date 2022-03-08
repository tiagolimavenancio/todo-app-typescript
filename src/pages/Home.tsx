import { useCallback, useEffect, useMemo, useState } from 'react';
import { Input, Text, Button, Row, Column, List, Logo, Icon } from 'components';
import { useTodo } from 'hooks';

const SECONDS_DEFAULT = 5;

export const Home = () => {
  const { tasks, getTodos, createTodo, updateTodo } = useTodo();

  const [taskName, setTaskName] = useState('');
  const [seconds, setSeconds] = useState(SECONDS_DEFAULT);
  const [timer, setTimer] = useState<any>();
  const [stage, setStage] = useState('ready');
  const [taskIndex, setTaskIndex] = useState(0);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const handleOK = useCallback(async () => {
    await createTodo({ title: taskName, completed: false });
    await getTodos();
    setTaskName('');
  }, [taskName, createTodo, getTodos]);

  const secondsToTime = (secs: number) => {
    const divisorMinutes = secs % 3600;
    let minutes: any = Math.floor(divisorMinutes / 60);
    minutes = String(minutes).padStart(2, '0');

    const divisorSeconds = divisorMinutes % 60;
    let seconds: any = Math.ceil(divisorSeconds);
    seconds = String(seconds).padStart(2, '0');

    return `${minutes}:${seconds}`;
  };

  const startTimer = () => {
    setStage('in_progress');

    const timerInterval = setInterval(() => {
      setSeconds((previousSeconds) => {
        if (previousSeconds === 0) {
          clearInterval(timerInterval);
          setTimer(undefined);
          setStage('finished');
          return 0;
        }

        return previousSeconds - 1;
      });

      setTimer(timerInterval);
    }, 1000);
  };

  const handleRestart = useCallback(() => {
    setStage('ready');
    setSeconds(SECONDS_DEFAULT);
    clearInterval(timer);
    setTimer(undefined);
  }, [timer]);

  const handlePause = useCallback(() => {
    clearInterval(timer);
    setTimer(undefined);
  }, [timer]);

  const handleStop = useCallback(() => {
    handlePause();
    setSeconds(SECONDS_DEFAULT);
    setStage('ready');
  }, [handlePause]);

  const handleDone = useCallback(async () => {
    const task = tasks[taskIndex];
    if (task) {
      await updateTodo(`${task.id}`, { ...task, completed: true });
      await getTodos();
    }
  }, [tasks, taskIndex, updateTodo, getTodos]);

  const handleStageStatus = useMemo(() => {
    switch (stage) {
      case 'ready':
        return 'Ready';
      case 'in_progress':
        return 'Time to Work!';
      case 'finished':
        return 'Finished';
      default:
        return 'Ready';
    }
  }, [stage]);

  const handleStageButtons = useMemo(() => {
    switch (stage) {
      case 'in_progress':
        return (
          <>
            <Row py="20px">
              <Button variant="primary" p="10px 20px" mx="5px" onClick={startTimer}>
                <Icon variant="play" />
              </Button>
              <Button variant="primary" p="10px 20px" mx="5px" onClick={handlePause}>
                <Icon variant="pause" />
              </Button>
              <Button variant="primary" p="10px 20px" mx="5px" onClick={handleStop}>
                <Icon variant="stop" />
              </Button>
            </Row>
          </>
        );
      case 'finished':
        return (
          <>
            <Row py="20px">
              <Button variant="primary" p="10px 20px" mx="5px" onClick={handleRestart}>
                <Icon variant="restart" />
              </Button>
              <Button variant="primary" p="10px 20px" mx="5px" onClick={handleDone}>
                <Icon variant="done" />
              </Button>
            </Row>
          </>
        );
      case 'ready':
      default:
        return (
          <>
            <Button variant="primary" onClick={startTimer}>
              <Text fontFamily="secondary" fontSize="bodyExtraLarge" fontWeight="bold" color="primary">
                START
              </Text>
            </Button>
          </>
        );
    }
  }, [stage, handlePause, handleStop, handleRestart, handleDone]);

  return (
    <Column width="680px" margin="0 auto">
      <Column width="100%" py="25px" alignItems="center">
        <Logo />
      </Column>

      <Column
        width="100%"
        minHeight="300px"
        p="20px"
        bg="rgba(255, 255, 255, 0.2)"
        borderRadius="4px"
        alignItems="center"
      >
        <Text fontFamily="secondary" fontSize="bodyExtraLarge">
          {handleStageStatus}
        </Text>
        <Text fontFamily="secondary" fontWeight="bold" fontSize="displayExtraLarge" py="30px">
          {secondsToTime(seconds)}
        </Text>

        {handleStageButtons}
      </Column>

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

      <List items={tasks} selectedIndex={taskIndex} onClick={setTaskIndex} />
    </Column>
  );
};
