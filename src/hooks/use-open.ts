import * as React from 'react';

export const useOpen = (initialValue: boolean = false) => {
    const [open, setOpen] = React.useState<boolean>(initialValue);

    const handleOpen = () => setOpen(() => true);

    const handleClose = () => setOpen(() => false);

    return { open, setOpen, handleOpen, handleClose };
};
