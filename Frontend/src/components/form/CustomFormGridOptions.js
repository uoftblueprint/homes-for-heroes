import {DataGrid} from "@mui/x-data-grid";
import Button from "@mui/material/Button";

export default function FormGridOptionView({qTypeProperty, choices, rows}) {
 
    const toggleCell = (params) => {
        rows[params.id][params.field] = !rows[params.id][params.field]
    }
    const constructColOptions = () => {
        let options = [{
            field: 'id',
            headerName: '', 
            hide: true
        }, 
        {
            field: 'name',
            headerName: ''
        }
    ];
        for (const choice of choices){
            options.push(
                {
                    field: choice,
                    headerName: choice,
                    type: 'actions',
                    width: 150,
                    renderCell: (params) => {
                        return <qTypeProperty.view checked={rows[params.id][choice]} />
                }
                }
            )
        }
        return options;
    }

    const colOptions = constructColOptions();

    return (
        <DataGrid
            container
            autoHeight
            disableSelectionOnClick={true}
            disableExtendRowFullWidth={true}
            hideFooter={true}
            rows={rows}
            columns={colOptions}
            onCellClick={toggleCell}
        />
    )
}