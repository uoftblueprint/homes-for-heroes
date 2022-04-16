import {DataGrid} from "@mui/x-data-grid";

export default function FormGridOptionView({qTypeProperty, choices, rows}) {

    const rowOptions = rows.map((element, index) => ({ "id": element }))

    const constructColOptions = () => {
        let options = [{
            field: 'id',
            headerName: '',
        }];
        for (const choice of choices){
            options.push(
                {
                    field: choice,
                    headerName: choice,
                    type: 'actions',
                    width: 150,
                    renderCell: (params) => {
                        return <qTypeProperty.view {...qTypeProperty.viewProps} />
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
            rows={rowOptions}
            columns={colOptions}
            loading={rowOptions.length !== rows.length || colOptions.length !== choices.length + 1}
        />
    )
}