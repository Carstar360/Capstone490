//https://mui.com/material-ui/getting-started/installation/
import { Box, Alert, AlertTitle} from '@mui/material';

const Confirmation = () => {
    return <Box m="90px auto" width="80%" height="50vh">
        {/**https://mui.com/material-ui/api/alert/ */}
        <Alert severity="success">
            {/**https://mui.com/material-ui/api/alert-title/*/}
            <AlertTitle>Success</AlertTitle>
            Payment Confirmed! Your order number is ABC123456 - {" "}
            {/**https://www.w3schools.com/tags/tag_strong.asp */}
            <strong>Come visit us again soon!</strong>
        </Alert>
    </Box>;
};

export default Confirmation;