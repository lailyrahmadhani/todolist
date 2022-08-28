import { Flex, Input, Button, Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { EditIcon, CheckIcon, DeleteIcon, CloseIcon } from '@chakra-ui/icons';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [activity, setActivity] = useState('');
  const [edit, setEdit] = useState({});

  const addTodo = () => {
    const todo = {
      id: Date.now(),
      activity,
      done: false,
    };
    setTodos([...todos, todo]);
    setActivity('');
  };

  const deleteTodo = (deleteTodo) => {
    const deletedTodo = todos.filter(todo => todo.id !== deleteTodo.id);
    setTodos(deletedTodo);
    setActivity('');
    setEdit({});
  };

  const doneTodo = (todo) => {
    const doneTodo = {
      ...todo, 
      done: !todo.done,

    };
    const indexTodo = todos.findIndex((t) => t.id === todo.id);
    const updatedTodos = [...todos]
    updatedTodos[indexTodo] = doneTodo;
    setTodos(updatedTodos);
  };

  const editTodo = () => {
    const editedTodo = {
      ...edit,
      activity,
    };
    const indexTodo = todos.findIndex((t) => t.id === edit.id);
    const updatedTodos = [...todos];
    updatedTodos[indexTodo] = editedTodo;
    setTodos(updatedTodos);
    setEdit({});
    setActivity('');
  };

  return (
    <Flex w="100vw" h="100vh" alignItems="center" p={4} flexDirection="column">
      <Flex w="400px" columnGap="5px" p={4}>
        <Input placeholder="What are you doing today" size="md" value={activity} onChange={(e) => setActivity(e.target.value)} />
        <Button
        colorScheme="telegram"
        onClick={edit.id ? editTodo : addTodo}
        variant="solid">
          {edit.id ? 'Edit' : 'Submit'}
          </Button>
        {edit.id && (
          <Button
            colorScheme="teal"
            onClick={() => {
              setEdit({});
              setActivity('');
            }}
            variant="solid"
          >
            Cancel
          </Button>
        )}

        
      </Flex>
      <Flex direction="column" rowGap="25px" w="500px" p={4}>
        {todos.length <= 0 ? (
        <Text>No data</Text>
        ) : (
          todos.map((todo)=> (
            <Flex key={todo.id} p={4} alignItems="center" justifyContent="space-between" boxShadow="md" bgColor={todo.done ? 'green.400' : 'white'}>
              <Text>{todo.activity}</Text>
              <Flex columnGap="5px">
              
                <Button colorScheme={todo.done ? 'red' : "telegram"} onClick={() => doneTodo(todo)}>
                  {todo.done ? <CloseIcon /> : <CheckIcon />}
                </Button>
                <Button colorScheme="teal" onClick={() => { setEdit(todo);
              setActivity(todo.activity);
              }} disabled={todo.done}>
                  <EditIcon />
                </Button>
                <Button colorScheme="red" onClick={() => deleteTodo(todo)} disabled={todo.done}>
                  <DeleteIcon />
                </Button>
              </Flex>
              
            </Flex>
          ))
      )}
    </Flex>
    </Flex>
  );
}
