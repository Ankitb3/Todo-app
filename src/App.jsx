import {
  Box,
  Center,
  Text,
  Input,
  Container,
  Button,
  Flex,
  Spacer,
  useColorMode,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, SunIcon, MoonIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
const App = () => {
  const { toggleColorMode } = useColorMode();
  const [todos, setTodos] = useState("");
  const [list, setList] = useState([]);
  const toast = useToast();

  function Addactivity() {
    if (todos === "") {
      toast({
        position: "top",
        title: "Please add todo first",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else {
      setList([...list, todos]);
      setTodos("");
      localStorage.setItem("list", list);
      toast({
        position: "top",
        title: "Todo add successfully",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  }
   function removeone(index){
    const updatelist= list.filter((ele,id)=>{
     return index!==id
    })
    setList(updatelist)
   
   }
  function removeall(){
    setList([]);
  }
  return (
    <>
      <Container maxW={"90%"} height={"100vh"}>
        <Center>
          <Text fontSize="5xl" mt={20}>
            Todo List
          </Text>
        </Center>
        <Button onClick={toggleColorMode} ml={10}>
          <SunIcon />
          <MoonIcon />
        </Button>
        <Flex mt={10}>
          <Box ml={400} width={350}>
            <Input
              placeholder="Write here"
              value={todos}
              onChange={(e) => setTodos(e.target.value)}
            />
          </Box>
          <Spacer />
          <Box mr={390}>
            <Button
              colorScheme="blue"
              onClick={Addactivity}
             
            >
              <AddIcon />
            </Button>
          </Box>
        </Flex>
        <Box>
          {list !== [] &&
            list.map((data, index) => {
              return (
                <>
                  <Flex key={index} mt={10}>
                    <Box ml={400} width={350}>
                      {data}
                    </Box>
                    <Spacer />
                    <Box
                      mr={320}
                      color={"red"}
                      size="lg"
                      cursor={"pointer"}
                      onClick={() => removeone(index)}
                      _hover={{
                        color: "blue",
                      }}
                    >
                      <DeleteIcon />
                    </Box>
                  </Flex>
                  <Container maxW={600}>
                    <Divider />
                  </Container>
                </>
              );
            })}
          <Box>
            {list.length >= 2 && (
              <Flex justifyContent={"center"} m={5}>
                <Button colorScheme="blue" onClick={removeall}>
                  Delete all
                </Button>
              </Flex>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default App;
