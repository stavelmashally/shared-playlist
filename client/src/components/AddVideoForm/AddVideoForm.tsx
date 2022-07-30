import React, { useState } from 'react';
import { Button, Flex, Input } from '@chakra-ui/react';

interface AddVideoFormProps {
  onSubmit: (videoUrl: string) => void;
}

const AddVideoForm = ({ onSubmit }: AddVideoFormProps) => {
  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input !== '' && validateYouTubeUrl(input)) {
      onSubmit(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex gap={4} px={4}>
        <Input
          value={input}
          placeholder='Enter video URL'
          borderColor='gray.300'
          onChange={handleInputChange}
          _hover={{ borderColor: 'gray.500' }}
        />
        <Button type='submit' colorScheme='purple'>
          Add
        </Button>
      </Flex>
    </form>
  );
};

function validateYouTubeUrl(url: string) {
  const regExp =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return url.match(regExp);
}

export default AddVideoForm;
