import { useState } from "react";
import { Box, Modal, TextField, Typography, Checkbox, FormControlLabel } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ReplayIcon from "@mui/icons-material/Replay";
import { CustomButton as Button } from "../../../shared/ui/Button/Button.tsx";
import { useApproveAdvertisement, useRejectAdvertisement, useRequestChangesAdvertisement } from "../../../store/api/advertisements/advertisementsApi.ts";
import {useParams} from "react-router-dom";

const REASONS = [
    "Запрещённый товар",
    "Неверная категория",
    "Некорректное описание",
    "Проблемы с фото",
    "Подозрение на мошенничество",
    "Другое",
];

type ModalType = 'reject' | 'request-changes' | null;

export function ModerationButtons() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(null);
    const [selectedReason, setSelectedReason] = useState<string | null>(null);
    const [comment, setComment] = useState("");

    const { id } = useParams<{ id: string }>();

    const handleRejectClick = () => {
        setModalType('reject');
        setModalOpen(true);
    };

    const handleRequestChangesClick = () => {
        setModalType('request-changes');
        setModalOpen(true);
    };

    const handleClose = () => {
        setSelectedReason(null);
        setComment("");
        setModalOpen(false);
        setModalType(null);
    };

    const handleSelect = (reason: string) => {
        setSelectedReason(reason);
        if (reason !== "Другое") {
            setComment("");
        }
    };

    const mutationApprove = useApproveAdvertisement(Number(id));
    const mutationReject = useRejectAdvertisement(Number(id));
    const mutationRequestChanges = useRequestChangesAdvertisement(Number(id));

    const handleSubmit = () => {
        let finalReason = selectedReason || "";

        if (selectedReason === "Другое") {
            if (!comment.trim()) {
                alert("Пожалуйста, укажите причину в поле комментария");
                return;
            }
            finalReason = comment.trim();
        }

        if (!finalReason) {
            alert("Пожалуйста, выберите причину");
            return;
        }

        const submitData = {
            reason: finalReason,
            comment: comment.trim() || ''
        };

        if (modalType === 'reject') {
            mutationReject.mutate(submitData);
        } else if (modalType === 'request-changes') {
            mutationRequestChanges.mutate(submitData);
        }

        handleClose();
    };

    const getModalConfig = () => {
        switch (modalType) {
            case 'reject':
                return {
                    title: "Укажите причину отклонения",
                    buttonText: "Отклонить",
                    buttonColor: "#f44336",
                    mutation: mutationReject
                };
            case 'request-changes':
                return {
                    title: "Укажите причину возврата на доработку",
                    buttonText: "Вернуть на доработку",
                    buttonColor: "#ff9800",
                    mutation: mutationRequestChanges
                };
            default:
                return {
                    title: "Укажите причину",
                    buttonText: "Подтвердить",
                    buttonColor: "#1976d2",
                    mutation: mutationReject
                };
        }
    };

    const modalConfig = getModalConfig();

    return (
        <>
            <Box display="flex" gap={2}>
                <Button
                    text="Одобрить"
                    backgroundColor="#4caf50"
                    textColor="#fff"
                    hoverBackgroundColor="#43a047"
                    iconLeft={<CheckIcon />}
                    onClick={mutationApprove.mutate}
                    disabled={mutationApprove.isPending}
                />
                <Button
                    text="Отклонить"
                    backgroundColor="#f44336"
                    textColor="#fff"
                    hoverBackgroundColor="#e53935"
                    iconLeft={<CloseIcon />}
                    onClick={handleRejectClick}
                    disabled={mutationReject.isPending}
                />
                <Button
                    text="Вернуть на доработку"
                    backgroundColor="#ffeb3b"
                    textColor="#000"
                    hoverBackgroundColor="#fdd835"
                    iconLeft={<ReplayIcon />}
                    onClick={handleRequestChangesClick}
                    disabled={mutationRequestChanges.isPending}
                />
            </Box>

            <Modal open={modalOpen} onClose={handleClose}>
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 420,
                    bgcolor: "background.paper",
                    p: 3,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}>
                    <Typography variant="h6">{modalConfig.title}</Typography>

                    <Box display="flex" flexDirection="column" gap={1}>
                        {REASONS.map((item) => (
                            <FormControlLabel
                                key={item}
                                control={
                                    <Checkbox
                                        checked={selectedReason === item}
                                        onChange={() => handleSelect(item)}
                                    />
                                }
                                label={item}
                            />
                        ))}
                    </Box>

                    <TextField
                        label="Комментарий (необязательно)"
                        multiline
                        minRows={2}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Дополнительный комментарий..."
                    />

                    <Box display="flex" justifyContent="flex-end" gap={1}>
                        <Button
                            text="Отмена"
                            backgroundColor="#e0e0e0"
                            textColor="#000"
                            hoverBackgroundColor="#d5d5d5"
                            onClick={handleClose}
                        />
                        <Button
                            text={modalConfig.buttonText}
                            backgroundColor={modalConfig.buttonColor}
                            textColor="#fff"
                            hoverBackgroundColor={modalConfig.buttonColor}
                            onClick={handleSubmit}
                            disabled={modalConfig.mutation.isPending}
                        />
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
