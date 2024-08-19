import {
    Button,
    FormLabel,
    Select,
    Textarea,
    FormControl,
    Flex,
    FormHelperText, Input,
} from '@chakra-ui/react';
import '../../deploy-table.css';
import Form from "antd/es/form";
import {
    Deployment, Project,
    useGetEnvsQuery,
    useGetProjectsQuery,
    usePostDeploymentMutation, usePostProjectMutation
} from "../../store/endpoints/be.endpoints";
import {useCallback} from "react"; // Import CSS file

function ProjectForm() {

    const [form] = Form.useForm<Project>();

    const initialValues: Partial<Project> = {};
    const [postProject] = usePostProjectMutation();

    const handleSubmit = useCallback(
        async (values: Project) => {
            const result = await postProject({...initialValues, ...values});
            if (result) {
                console.log('Saved')
            }
        },
        []
    );

    return (
        <Form form={form} onFinish={handleSubmit} initialValues={initialValues}>
            <Flex direction={"column"} gap={4}>
                <FormControl mr="5%">
                    <FormLabel fontWeight={'normal'}>Name:</FormLabel>
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'ddd'
                            },
                            {
                                whitespace: true,
                                message: 'ddd'
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                </FormControl>

                <FormControl>
                    <FormLabel fontWeight={'normal'}>Description:</FormLabel>
                    <Form.Item
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'ddd'
                            },
                            {
                                whitespace: true,
                                message: 'ddd'
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight={'normal'}>Git Config Repository:</FormLabel>
                    <Form.Item
                        name="gitConfigRepository"
                        rules={[
                            {
                                required: true,
                                message: 'ddd'
                            },
                            {
                                whitespace: true,
                                message: 'ddd'
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight={'normal'}>Artifactory Deployment Descriptor Folder:</FormLabel>
                    <Form.Item
                        name="artifactoryDeploymentDescriptorFolder"
                        rules={[
                            {
                                required: true,
                                message: 'ddd'
                            },
                            {
                                whitespace: true,
                                message: 'ddd'
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                </FormControl>
                <FormControl mt="2%">
                    <FormLabel fontWeight={'normal'}>
                        Services:
                    </FormLabel>
                    <Form.Item
                        name="artifactoryDeploymentDescriptorFolder"
                    >
                        <Input/>
                    </Form.Item>
                </FormControl>
            </Flex>
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="submit" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )

}

export default ProjectForm;