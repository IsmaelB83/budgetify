import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

export default function Orders(props) {
    
    const { partidas } = props;
    const classes = useStyles();
    
    return (
        <React.Fragment>
            <Title>Partidas presupuestarias</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Responsable</TableCell>
                        <TableCell>Negocio</TableCell>
                        <TableCell>Tagetik</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell align="right">Presupuesto</TableCell>
                        <TableCell>SAP</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {partidas.map(partida => (
                        <TableRow key={partida._id}>
                            <TableCell>{partida.responsible}</TableCell>
                            <TableCell>{partida.department}</TableCell>
                            <TableCell>{partida.tagetik}</TableCell>
                            <TableCell>{partida.description}</TableCell>
                            <TableCell>{partida.type}</TableCell>
                            <TableCell align="right">{partida.budget}</TableCell>
                            <TableCell>{partida.SAPObject}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={classes.seeMore}>
                <Link color="primary" href="#" onClick={preventDefault}>
                    See more...
                </Link>
            </div>
        </React.Fragment>
    );
}
        