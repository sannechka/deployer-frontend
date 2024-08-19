import { PartialBy } from '@app/common/utils/type-utils';
import { lengthValidator } from '@app/common/validation-rules/length-validator';
import SelectWrapper from '@app/components/select-wrapper/select-wrapper';
import { KAFKA_TOPIC_SYMBOLS } from '@app/constants/common.constants';
import { ActionDestinationDto } from '@app/types/entities/action-destination.entity';

import { UxInput } from '@netcracker/ux-react/inputs/input/input.component';
import { UxTextArea } from '@netcracker/ux-react/inputs/input/textarea/textarea.component';
import Form from 'antd/es/form';
import Col from 'antd/es/grid/col';
import Row from 'antd/es/grid/row';
import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import EditorFooter, { EditorFooterProps } from '../../../components/editor-footer/editor-footer';
import { useDestinationDeleteConfirmMessage } from './use-destination-delete-confirm-message';
import {
  useDeleteActionDestinationMutation,
  useGetActionDestinationsQuery,
  useGetConvertersQuery,
  usePatchActionDestinationMutation,
} from '@app/store/endpoints/action-destination.endpoint';
import { isSuccessMutation } from '@app/store/_query/base-query';
import { uxNotificationHelper } from '@netcracker/ux-react/notification/notification.helper';

interface DestinationEditorProps
  extends Omit<EditorFooterProps, 'loading' | 'isNew' | 'confirm' | 'withDeleteConfirm'> {
  entityId?: string;

  onSave?: () => void;
}

type FormValues = PartialBy<ActionDestinationDto, 'id'>;

const { Item } = UxForm;

const DestinationEditor: FC<DestinationEditorProps> = ({ onSave, entityId, onDelete, ...footerProps }) => {
  const [form] = UxForm.useForm<FormValues>();
  const { model } = useGetActionDestinationsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      model: data?.find(destination => destination.id === entityId),
    }),
  });
  const deleteConfirmMessage = useDestinationDeleteConfirmMessage(entityId);
  const { t } = useTranslation();
  const initialValues: Partial<FormValues> = model ?? {};
  const { data: converters = [], isLoading: convertersLoading } = useGetConvertersQuery();
  const [deleteActionDestination] = useDeleteActionDestinationMutation();
  const [patchActionDestination] = usePatchActionDestinationMutation();
  const handleSubmit = useCallback(
    async (values: FormValues) => {
      const result = await patchActionDestination({ ...initialValues, ...values });
      if (isSuccessMutation(result)) {
        uxNotificationHelper.success({
          title: t('notifications.header.success'),
          description: model?.name
            ? t('notifications.header.update_entity', { entity: t('notifications.entities.destination') })
            : t('notifications.header.create_entity', { entity: t('notifications.entities.destination') }),
          key: 'destination-saved',
        });
        onSave?.();
      }
    },
    [onSave]
  );

  const handleDelete = useCallback(async () => {
    if (model?.id) {
      const result = await deleteActionDestination(model?.id);
      if (isSuccessMutation(result)) {
        uxNotificationHelper.success({
          title: t('notifications.header.success'),
          description: t('notifications.header.delete_entity', {
            entity: t('notifications.entities.destination'),
          }),
          key: 'destination-deleted',
        });
        onDelete?.();
      }
    }
  }, [model, onDelete]);

  return (
    <UxForm form={form} onFinish={handleSubmit} initialValues={initialValues}>
      <Row gutter={[12, 30]}>
        <Col span={24}>
          <Row gutter={[12, 12]}>
            <Col span={6}>
              <Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: t('input_validation.required', {
                      fieldName: t('settings_page.destination_card.popup_editor.form.name_lbl'),
                    }),
                  },
                  {
                    whitespace: true,
                    message: t('input_validation.blank', {
                      fieldName: t('settings_page.destination_card.popup_editor.form.name_lbl'),
                    }),
                  },
                  lengthValidator(t('settings_page.destination_card.popup_editor.form.name_lbl'), 64),
                ]}
              >
                <UxInput
                  label={t('settings_page.destination_card.popup_editor.form.name_lbl')}
                  tooltipProps={{ placement: 'top-end' }}
                />
              </Item>
            </Col>
            <Col span={6}>
              <Item
                name="namespace"
                rules={[
                  {
                    required: true,
                    message: t('input_validation.required', {
                      fieldName: t('settings_page.destination_card.popup_editor.form.namespace_lbl'),
                    }),
                  },
                  {
                    whitespace: true,
                    message: t('input_validation.blank', {
                      fieldName: t('settings_page.destination_card.popup_editor.form.namespace_lbl'),
                    }),
                  },
                  {
                    pattern: KAFKA_TOPIC_SYMBOLS,
                    message: t('settings_page.destination_card.popup_editor.form.valid_topic_warn'),
                  },
                  lengthValidator(t('settings_page.destination_card.popup_editor.form.namespace_lbl'), 64),
                ]}
              >
                <UxInput
                  label={t('settings_page.destination_card.popup_editor.form.namespace_lbl')}
                  tooltipProps={{ placement: 'top-end' }}
                />
              </Item>
            </Col>
            <Col span={6}>
              <Item
                name="classifierName"
                rules={[
                  {
                    required: true,
                    message: t('input_validation.required', {
                      fieldName: t('settings_page.destination_card.popup_editor.form.classifier_name_lbl'),
                    }),
                  },
                  {
                    whitespace: true,
                    message: t('input_validation.blank', {
                      fieldName: t('settings_page.destination_card.popup_editor.form.classifier_name_lbl'),
                    }),
                  },
                  {
                    pattern: KAFKA_TOPIC_SYMBOLS,
                    message: t('settings_page.destination_card.popup_editor.form.valid_topic_warn'),
                  },

                  lengthValidator(t('settings_page.destination_card.popup_editor.form.classifier_name_lbl'), 249),
                ]}
              >
                <UxInput
                  label={t('settings_page.destination_card.popup_editor.form.classifier_name_lbl')}
                  tooltipProps={{ placement: 'top-end' }}
                />
              </Item>
            </Col>
            <Col span={6}>
              <Item
                name="converterId"
                rules={[
                  {
                    required: true,
                    message: t('input_validation.required', {
                      fieldName: t('settings_page.destination_card.popup_editor.form.converter_lbl'),
                    }),
                  },
                ]}
              >
                <SelectWrapper
                  allowClear
                  loading={convertersLoading}
                  label={t('settings_page.destination_card.popup_editor.form.converter_lbl')}
                  tooltipProps={{ placement: 'bottom-end' }}
                  options={converters.map(converter => ({
                    value: converter.id,
                    label: converter.id,
                  }))}
                />
              </Item>
            </Col>
            <Form.Item noStyle dependencies={['converterId']}>
              {({ getFieldValue }) => {
                const converterId: any = getFieldValue(['converterId']);
                if (converterId) {
                  return (
                    <Col span={24}>
                      <UxTextArea
                        autoSize={{ minRows: 3, maxRows: 8 }}
                        spellCheck={false}
                        resizable
                        label={t('settings_page.destination_card.popup_editor.form.converter_description_lbl')}
                        value={converters.find(it => it.id === converterId)?.description?.trim()}
                      />
                    </Col>
                  );
                }
              }}
            </Form.Item>
          </Row>
        </Col>
        <Col span={24}>
          <EditorFooter
            isNew={!initialValues.id}
            onDelete={handleDelete}
            confirm={deleteConfirmMessage}
            withDeleteConfirm
            {...footerProps}
          />
        </Col>
      </Row>
    </UxForm>
  );
};

export default memo(DestinationEditor);
