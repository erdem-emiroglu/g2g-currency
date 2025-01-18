import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {ModalNames, useModal} from "@/providers/modal.provider";
import {deleteUrl} from "@/app/actions";
import {useToast} from "@/providers/toast.provider";

export default function DeleteModal() {
    const {currentModal, closeModal, modalProps} = useModal();
    const {openToast} = useToast();
    const {name, id} = modalProps;

    const handleDelete = async () => {
        try {
            await deleteUrl(id);
            openToast({
                text: "Kayıt başarıyla silindi",
                variant: "success"
            });
        } catch (e) {
            openToast({
                text: "Kayıt silinirken bir hata oluştu",
                variant: "error"
            });
        } finally {
            closeModal();
        }
    }

    return (
        <Dialog
            open={currentModal === ModalNames.DELETE_MODAL}
            onClose={closeModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <form onSubmit={handleDelete}>
                <DialogTitle id="alert-dialog-title">
                    Kayıt Silme
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <strong style={{color: "white"}}>{name}</strong> silinecektir ve geri alınamaz. Kaydı silmek
                        istediğinize emin misiniz?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" autoFocus>
                        Onayla
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}
