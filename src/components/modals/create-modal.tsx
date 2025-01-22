import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {ModalNames, useModal} from "@/providers/modal.provider";
import {createUrl} from "@/app/actions";
import {useToast} from "@/providers/toast.provider";
import {urlRegex} from "@/constants/regex";
import {useForm} from "react-hook-form";
import FormInput from "@/components/inputs/form-input";

type CreateInputs = {
    name: string,
    url: string
}

export default function CreateModal() {
    const {currentModal, closeModal} = useModal();
    const {openToast} = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateInputs>()

    const onSubmit = async (data: CreateInputs) => {
        const {name, url} = data;

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
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <DialogContentText>
                        Yeni kayıt eklemek için lütfen aşağıdaki alanları eksiksiz doldurunuz.
                    </DialogContentText>
                    <FormInput
                        id="name"
                        name="name"
                        label="Adı"
                        register={register}
                        errors={errors}
                        validationRules={{
                            required: 'Ad alanı boş bırakılamaz',
                        }}
                    />
                    <FormInput
                        id="url"
                        name="url"
                        label="Url"
                        register={register}
                        errors={errors}
                        validationRules={{
                            required: 'Url alanı boş bırakılamaz',
                            pattern: {
                                value: urlRegex,
                                message: 'Yanlış url formatı',
                            },
                        }}
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
