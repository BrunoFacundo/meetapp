import { useField } from '@rocketseat/unform';
import React, { useEffect, useRef, useState } from 'react';
import { MdCameraAlt } from 'react-icons/md';
import { Container } from './styles';

export default function BannerInput({ name }) {
    const ref = useRef(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);
    const [file, setFile] = useState(defaultValue);

    useEffect(() => {
        if (ref.current) {
            registerField({
                name: fieldName,
                ref: ref.current,
                path: 'dataset.file'
            });
        }
    }, [ref.current, fieldName]); // eslint-disable-line

    function handleChange(e) {
        const file = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;
        if (file) {
            var reader = new FileReader();
            reader.onload = e => {
                setFile(`${file.name}|${e.target.result}`);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <>
            <Container>
                <input type="file" id="banner" ref={ref} accept="image/*" data-file={file} onChange={handleChange} />
                <label htmlFor="banner">
                    {file ? (
                        <img src={file.includes('|') ? file.split('|')[1] : file} alt="Banner" />
                    ) : (
                        <>
                            <MdCameraAlt size={42} />
                            <strong>Selecionar imagem</strong>
                        </>
                    )}
                </label>
            </Container>
            {error && <span>{error}</span>}
        </>
    );
}
