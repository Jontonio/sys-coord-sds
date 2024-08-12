interface RootObject {
  id: number;
  id_card_user: string;
  name: string;
  surname_user: string;
  email: string;
  email_verified_at: null;
  cod_modular_ie: null;
  id_ie_teacher: null;
  created_at: string;
  updated_at: string;
  roles: Role[];
}

interface Role {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
  permissions: Permission[];
}

interface Permission {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot2;
}

interface Pivot2 {
  role_id: number;
  permission_id: number;
}

interface Pivot {
  model_type: string;
  model_id: number;
  role_id: number;
}
