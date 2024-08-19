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
    Deployment,
    useGetEnvsQuery,
    useGetProjectsQuery,
    usePostDeploymentMutation
} from "../../store/endpoints/be.endpoints";
import {useCallback} from "react"; // Import CSS file

function DeployForm() {

    const [form] = Form.useForm<Deployment>();

    const initialValues: Partial<Deployment> = {};
    const [postDeployment] = usePostDeploymentMutation();
    const {data: projects = []} = useGetProjectsQuery();
    const {data: envs = []} = useGetEnvsQuery();

    const handleSubmit = useCallback(
        async (values: Deployment) => {
            const result = await postDeployment({...initialValues, ...values});
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
                    <FormLabel fontWeight={'normal'}>Project:</FormLabel>
                    <Form.Item
                        name="projectId"
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
                        <Select>
                            {projects.map(it => <option key={it.id} value={it.id}>{it.name}</option>)}
                        </Select>
                    </Form.Item>
                </FormControl>

                <FormControl>
                    <FormLabel fontWeight={'normal'}>Environment:</FormLabel>
                    <Form.Item
                        dependencies={['projectId']}
                        name="envId"
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
                        <Select>
                            {envs.map(it => <option key={it.id} value={it.id}>{it.name}</option>)}
                        </Select>
                    </Form.Item>
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight={'normal'}>Namespace:</FormLabel>
                    <Form.Item
                        name="namespace"
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
                    <FormLabel fontWeight={'normal'}>Descriptor Version:</FormLabel>
                    <Form.Item
                        name="descriptorVersion"
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
                        Additional variables:
                    </FormLabel>
                    <Textarea
                        value={'value'}
                        onChange={() => {
                        }}
                        placeholder='Here is a sample placeholder'
                        size='sm'
                    />
                    <FormHelperText>helper</FormHelperText>
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

export default DeployForm;