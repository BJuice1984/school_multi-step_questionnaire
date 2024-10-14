import { Box, Spinner } from '@chakra-ui/react'

const Loading = () => (
    <Box textAlign='center' p={8}>
        <Spinner size='xl' />
        <Box mt={4}>Загрузка...</Box>
    </Box>
)

export default Loading
