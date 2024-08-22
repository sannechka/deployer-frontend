import {
    Button,
    IconButton,
    Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { FC, useRef } from 'react';
import ProjectForm, { ProjectFormProps, ProjectFormRefModel } from './project-form';


const EditEnvPopup: FC<ProjectFormProps> = ({ projectId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const formRef = useRef<ProjectFormRefModel>(null);
    return (
        <>
            <IconButton onClick={onOpen} colorScheme="gray" aria-label="edit-env" icon={<EditIcon />} />
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Project</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <ProjectForm onClose={onClose} projectId={projectId} ref={formRef} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={() => formRef?.current?.submit()} mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );

};

export default EditEnvPopup;


