import { useField } from '@rocketseat/unform';
import React, { useEffect, useRef, useState } from 'react';
import { MdCameraAlt } from 'react-icons/md';
import { Container } from './styles';

export default function BannerInput({ name }) {
    const { defaultValue, registerField } = useField('file');
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(defaultValue && defaultValue.url);
    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            registerField({
                name,
                ref: ref.current,
                path: 'dataset.file'
            });
        }
    }, [ref]); // eslint-disable-line

    function handleChange(e) {
        const file = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;
        if (file) {
            var reader = new FileReader();
            reader.onload = e => {
                setFile(e.target.result);
                setPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <Container>
            <input type="file" id="banner" ref={ref} accept="image/*" data-file={file} onChange={handleChange} />
            <label htmlFor="banner">
                {preview ? (
                    <img src={preview} alt="Banner" />
                ) : (
                    <>
                        <MdCameraAlt size={42} />
                        <strong>Selecionar imagem</strong>
                    </>
                )}
            </label>
        </Container>
    );
}
