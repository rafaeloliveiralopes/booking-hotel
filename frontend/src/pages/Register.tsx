import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      showToast({ message: 'Registro realizado', type: 'SUCCESS' });
      navigate('/');
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Criar conta</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Nome
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register('firstName', { required: 'Obrigatório preencher' })}
          >
            {errors.firstName && (
              <span className="text-red-500">{errors.firstName.message}</span>
            )}
          </input>
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Sobrenome
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register('lastName', { required: 'Obrigatório preencher' })}
          >
            {errors.lastName && (
              <span className="text-red-500">{errors.lastName.message}</span>
            )}
          </input>
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('email', { required: 'Obrigatório preencher' })}
        >
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </input>
      </label>
      <label className="text-gray-700 text-sm font-bold">
        Senha
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('password', {
            required: 'Obrigatório preencher',
            minLength: {
              value: 6,
              message: 'A senha deve ter pelo menos seis caracteres',
            },
          })}
        >
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </input>
      </label>
      <label className="text-gray-700 text-sm font-bold">
        Confirme a senha
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('password', {
            validate: (val) => {
              if (!val) {
                return 'Obrigatório preencher';
              } else if (watch('password') !== val) {
                return 'As senhas estão diferentes';
              }
            },
          })}
        >
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </input>
      </label>
      <span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 w-2/4 font-bold hover:bg-blue-500 text-xl rounded-lg"
        >
          Criar conta
        </button>
      </span>
    </form>
  );
}
