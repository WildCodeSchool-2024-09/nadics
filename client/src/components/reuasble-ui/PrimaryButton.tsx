import styled from "styled-components";

interface PrimaryButtonProps extends Record<string, unknown> {
  className?: string;
  type?: "button" | "submit" | "reset";
  label: string;
}

export default function PrimaryButton({
  type,
  className,
  label,
  ...extraProps
}: PrimaryButtonProps) {
  return (
    <PrimaryButtonStyled type={type} className={className} {...extraProps}>
      {label}
    </PrimaryButtonStyled>
  );
}

const PrimaryButtonStyled = styled.button` 
  background-color: #000000;
  border: 1px solid transparent;
  display: block;
  min-width: 1rem;
  min-height: 3.875rem; 
  margin: 1rem auto;
  padding: 1.25rem 1.5rem; 
  gap: 0.625rem; 
  border-radius: 0.3125rem; 
  box-shadow: 0.625rem 0.625rem 0.875rem rgba(0, 0, 0, 0.25); 
  margin-bottom: 1.875rem; 
  color: #fff;
  text-align: center;
  font-size: 1.25rem; 
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  transition: all 200ms ease-out;

  &:hover {
    background-color: #fff;
    color: #000;
    border: 1px solid #000;
  }

  &:active {
    background-color: #000;
    color: #fff;
  }
`;
