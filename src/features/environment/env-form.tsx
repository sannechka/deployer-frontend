import {
    Button,
    FormLabel,
    FormControl,
    Flex,
    Input,
    Tabs,
    Tab,
    TabList,
    TabPanel,
    TabPanels
} from '@chakra-ui/react';
import '../../deploy-table.css';
import Form from "antd/es/form";

import {useCallback} from "react";
import {Env, usePostEnvMutation} from "../../store/endpoints/be.endpoints";

function EnvForm() {

    const [form] = Form.useForm<Env>();

    const initialValues: Partial<Env> = {};
    const [postEnv] = usePostEnvMutation();

    const handleSubmit = useCallback(
        async (values: Env) => {
            const result = await postEnv({...initialValues, ...values});
            if (result) {
                console.log('Saved')
            }
        },
        []
    );

    return (
        <Form form={form} onFinish={handleSubmit} initialValues={initialValues}>
            <Tabs variant='enclosed'>
                <TabList>
                    <Tab>Env Settings</Tab>
                    <Tab>Env Variables</Tab>
                    <Tab>Services Variables</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
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
                        <Input/>
                    </Form.Item>
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight={'normal'}>k8s Url:</FormLabel>
                    <Form.Item
                        name="k8sUrl"
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
                    <FormLabel fontWeight={'normal'}>Category:</FormLabel>
                    <Form.Item
                        name="category"
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
            </Flex>
                    </TabPanel>
                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="submit" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )

}

export default EnvForm;