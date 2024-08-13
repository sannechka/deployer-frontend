import {
    Button,
    FormLabel,
    Select,
    Textarea,
    FormControl,
    Flex,
    FormHelperText,
} from '@chakra-ui/react';
import '../../deploy-table.css'; // Import CSS file

function DeployForm() {
    return (
        <form>
            <Flex direction={"column"} gap={4}>
                <FormControl mr="5%">
                    <FormLabel fontWeight={'normal'}>Project:</FormLabel>
                    <Select placeholder='Select option'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel fontWeight={'normal'}>Environment:</FormLabel>
                    <Select placeholder='Select option'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight={'normal'}>Namespace:</FormLabel>
                    <Select placeholder='Select option'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
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
        </form>
    )

}

export default DeployForm;