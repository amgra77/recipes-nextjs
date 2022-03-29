import { useField } from 'formik';

const MyInput = ({ label, ...props }) => {
    const [ field, meta ] = useField(props);
    return (
        <div className="form-group">
            <label htmlFor={props.id||props.name}>{label}</label>
            <input className={(meta.touched && meta.error ? "border border-danger" : "") + " form-control"} {...field} {...props} />
            { meta.touched && meta.error ? <small className="text-danger">{meta.error}</small> : null }
        </div>
    );
}

export default MyInput;