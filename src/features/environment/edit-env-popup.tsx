import {
    Button,
    IconButton,
    Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { FC, useRef } from 'react';
import { EditIcon } from '@chakra-ui/icons';
import EnvForm, { EnvFormProps } from './env-form';
import { ProjectFormRefModel } from '../project/project-form';


const EditEnvPopup: FC<EnvFormProps> = ({ envId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const formRef = useRef<ProjectFormRefModel>(null);


    return (
        <>
            <IconButton onClick={onOpen} icon={<EditIcon />} colorScheme="gray" aria-label="env" />
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit environment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <EnvForm ref={formRef} envId={envId} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => formRef?.current?.submit()}>
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


