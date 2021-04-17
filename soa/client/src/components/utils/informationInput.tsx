import {Input} from 'wix-style-react';

export const InformationInput: React.FC<{value: string}> = ({value})=>{
    return(
        <div style={{marginLeft: "2rem", marginRight: "2rem"}}>
            <Input size="large" defaultValue={value} disabled={true} />
        </div>
    );
}