import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {ModalNames, useModal} from "@/providers/modal.provider";
import {createUrl} from "@/app/actions";
import {useToast} from "@/providers/toast.provider";

export default function CreateModal () {
    const { currentModal, closeModal } = useModal();
    const { openToast } = useToast();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const name = formData.get("name") as string;
        const url = formData.get("url") as string;

        try {
            await createUrl(url, name);
            openToast({
                text: "Kayıt başarıyla eklendi",
                variant: "success"
            });
        } catch (e) {
            openToast({
                text: "Kayıt eklenirken bir hata oluştu",
                variant: "error"
            });
        } finally {
            closeModal();
        }
    }
    return (
        <Dialog
            open={currentModal === ModalNames.CREATE_MODAL}
            onClose={closeModal}
        >
            <DialogTitle>Yeni kayıt ekle</DialogTitle>
            <form onSubmit={onSubmit}>
                <DialogContent>
                    <DialogContentText>
                        Yeni kayıt eklemek için lütfen aşağıdaki alanları eksiksiz doldurunuz.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label="Adı"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="url"
                        name="url"
                        label="Url"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal}>Vazgeç</Button>
                    <Button type="submit">Onayla</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}
