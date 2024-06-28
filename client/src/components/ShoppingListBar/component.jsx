import Checkbox from '@mui/material/Checkbox';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Button } from '@mui/material';

export default function ShoppingListBar(props) {
    return(
        <div className="shopping-list-bar">
            <div className='left-section'>
                <Checkbox checked={props.checked} onClick={() => props.onCheckboxClick(props.listId)}/>
                <span className='shopping-list-name'>{props.listName}</span>
            </div>
            <div className='right-section'> 
                <span className='shopping-date info'>{props.shoppingDate}</span>
                <span className='pending-items-count info'>
                    <InfoOutlinedIcon sx={{color: '#E0953C'}} className='icon'/>
                    <span>{props.pendingItems}</span>
                </span>
                <span className='completed-items-count info'>
                    <DoneAllIcon sx={{color: '#5EB85D'}} className='icon'/>
                    <span>{props.completedItems}</span>
                </span>
                <span className='delete-icon'>
                    <Button variant="text" className='delete-list-btn'><DeleteOutlinedIcon sx={{color: '#9F9F9F'}} /></Button>
                </span>
            </div>
        </div>
    )
}
