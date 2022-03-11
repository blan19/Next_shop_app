import React, { FC, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

interface IThumbInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  name: string;
  mode?: 'update' | 'append';
}

const ThumbInput: FC<IThumbInputProps> = (props) => {
  const { name, mode } = props;
  const { register, watch, unregister, setValue } = useFormContext();
  const files: File[] = watch(name);
  const onDrop = useCallback(
    (droppedFiles) => {
      let newFiles =
        mode === 'update' ? droppedFiles : [...(files || []), ...droppedFiles];
      if (mode === 'append') {
        newFiles = newFiles.reduce((prev: any, file: any) => {
          const fo = Object.entries(file);
          if (
            prev.find((e: File) => {
              const eo = Object.entries(e);
              return eo.every(
                ([key, value], index) =>
                  key === fo[index][0] && value === fo[index][1],
              );
            })
          ) {
            return prev;
          } else {
            return [...prev, file];
          }
        }, []);
      }
      setValue(name, newFiles, { shouldValidate: true });
    },
    [setValue, name, mode, files],
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: props.accept,
  });
  useEffect(() => {
    register(name, {
      required:
        name === 'thumbnail'
          ? { value: true, message: '썸네일을 업로드해주세요.' }
          : false,
    });
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);
  return (
    <ThumbInputContainer {...getRootProps()}>
      <ThunInputPropsContainer>
        <input {...props} {...getInputProps()} />
        <p>업로드</p>
      </ThunInputPropsContainer>
      {!!files?.length && (
        <ThumbPreviewContainer>
          {files.map((file) => {
            return (
              <ThumbPreviewBox key={file.name}>
                <img src={URL.createObjectURL(file)} alt={file.name} />
              </ThumbPreviewBox>
            );
          })}
        </ThumbPreviewContainer>
      )}
    </ThumbInputContainer>
  );
};

export default ThumbInput;

const ThumbInputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ThunInputPropsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
  p {
    background: var(--color-mainColor);
    padding: 1rem;
    border-radius: 0.5rem;
    color: var(--color-rPrimaryText);
    font-weight: bold;
    font-size: 1.5rem;
  }
  margin-bottom: 1rem;
`;

const ThumbPreviewContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
`;
const ThumbPreviewBox = styled.div`
  img {
    width: 100%;
  }
`;
