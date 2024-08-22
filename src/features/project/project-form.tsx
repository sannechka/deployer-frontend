import {
    Button,
    FormLabel,
    Flex,
    Input, IconButton, useToast,
} from '@chakra-ui/react';
import '../../deploy-table.css';
import Form from 'antd/es/form';
import {
    Project,
    useGetProjectsQuery, usePostProjectMutation,
} from '../../store/endpoints/be.endpoints';
import { forwardRef, useCallback, useImperativeHandle } from 'react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

export type ProjectFormProps = {
    projectId: string;
    onClose?: () => void;
}

export type ProjectFormRefModel = {
    submit: () => void;
};

const ProjectForm = forwardRef<ProjectFormRefModel, ProjectFormProps>(({ onClose, projectId }, ref) => {

    const [form] = Form.useForm<Project>();
    const toast = useToast();
    useImperativeHandle(ref, () => ({ submit: form.submit }));

    const [postProject] = usePostProjectMutation();
    const { project } = useGetProjectsQuery(undefined, {
        selectFromResult: (resp => ({
            project: resp.data?.find(it => it.id === projectId),
        })),
    });
    const initialValues: Partial<Project> = project ?? {};
    const handleSubmit = useCallback(
        async (values: Project) => {
            const result = await postProject({ ...initialValues, ...values });
            if ('error' in result) {
                toast({
                    title: 'Failed to save Project',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }
            toast({
                title: 'Project saved',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            onClose?.();
        },
        [],
    );

    return (
        <Form form={form} onFinish={handleSubmit} initialValues={initialValues}>
            <Flex direction={'column'}>
                <FormLabel fontWeight={600}>Name:</FormLabel>
                <Form.Item
                    style={{ marginBottom: 10 }}
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Name can not be empty',
                        },
                        {
                            whitespace: true,
                            message: 'Name can not be empty',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <FormLabel fontWeight={600}>Description:</FormLabel>
                <Form.Item
                    style={{ marginBottom: 10 }}
                    name="description"
                >
                    <Input />
                </Form.Item>
                <FormLabel fontWeight={600}>Git Config Repository:</FormLabel>
                <Form.Item
                    name="gitConfigRepository"
                    style={{ marginBottom: 10 }}
                    rules={[
                        {
                            type: 'url',
                            message: 'This field must be a valid url',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <FormLabel fontWeight={600}>Artifactory Deployment Descriptor Folder:</FormLabel>
                <Form.Item
                    style={{ marginBottom: 10 }}
                    name="artifactoryDeploymentDescriptorFolder"
                    rules={[
                        {
                            required: true,
                            message: 'Descriptor Folder can not be empty',
                        },
                        {
                            type: 'url',
                            message: 'This field must be a valid url',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <FormLabel fontWeight={600}>
                    Services:
                </FormLabel>
                <Form.List name="services">
                    {(fields, operations) => {
                        return (
                            <>
                                {fields.map((field, idx) => (
                                    <Flex width={'100%'} gap={2}>
                                        <Form.Item
                                            name={[idx]}
                                            rules={[{
                                                required: true,
                                                message: 'Service name can not be empty',
                                            }]}
                                        >
                                            <Input required />
                                        </Form.Item>
                                        <IconButton onClick={() => operations.remove(field.name)}
                                                    aria-label={'delete'} icon={<DeleteIcon />} />
                                    </Flex>
                                ))
                                }
                                <Button
                                    width={150}
                                    leftIcon={<AddIcon />}
                                    onClick={() => operations.add('')}
                                >
                                    Add Service
                                </Button>
                            </>
                        );
                    }}
                </Form.List>
            </Flex>
        </Form>
    );

});

export default ProjectForm;