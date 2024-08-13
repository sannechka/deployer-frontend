import '../../App.css';
import {
    IconButton, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr,
} from '@chakra-ui/react'
import {Project, useGetEnvsQuery} from "../../store/endpoints/be.endpoints";
import {EditIcon, SettingsIcon} from '@chakra-ui/icons'
import SubmitDeployPopup from "../deploy/submit-deploy-popup";
import EditEnvPopup from "./edit-env-popup";

type TableColumn = {
    key: string;
    label: string;
}
const columns: TableColumn[] = [
    {
        key: 'name',
        label: 'Name'
    },
    {
        key: 'projectId',
        label: 'projectId'
    },
    {
        key: 'k8sUrl',
        label: 'k8sUrl'
    },
    {
        key: 'category',
        label: 'category'
    },
    {
        key: 'updatedAt',
        label: 'Updated at'
    },
    {
        key: 'createdAt',
        label: 'Created at'
    },
]

const actionColumn: TableColumn[] = [{
    key: 'action',
    label: ''
}]

const EnvsTable = () => {

    const {data = [], isLoading} = useGetEnvsQuery()

    const projects = data as Project[];
    return (
        <TableContainer whiteSpace="pre-line">
            <Table variant='simple' size={'sm'} borderColor={'gray'} border={1}>
                <Thead>
                    <Tr>
                        <>
                            {columns.map(it => <Th key={it.key}>{it.label}</Th>)}
                            {actionColumn.map(it => <Th key={it.key}>{it.label}</Th>)}
                        </>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        <>
                            {projects?.map(project => <Tr>
                                {columns.map(column => <Td
                                    key={project.id + column.key}>{project[column.key as keyof Project]}</Td>)}
                                <Stack direction='row' spacing={2}>
                                    <EditEnvPopup/>
                                    <SubmitDeployPopup/>
                                </Stack>
                            </Tr>)}
                        </>

                    }
                </Tbody>
            </Table>
        </TableContainer>)
}

export default EnvsTable;


