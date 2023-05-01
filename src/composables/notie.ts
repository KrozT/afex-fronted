import notie, { AlertType, Position } from 'notie';

/**
 * Notie Notifications
 * Composable function only for encapsulating notie library with predefined values
 * @see https://github.com/jaredreich/notie
 */
export const useNotie = () => {
  /**
   * Alert base
   * @param message - Message to show
   * @param type - Type of alert
   * @param stay - Stay alert status
   * @param position - Position of alert
   */
  const alert = (message: string, type: AlertType, stay?: boolean, position?: Position) => {
    notie.alert({
      text: message, type, stay, position: position || 'bottom',
    });
  };

  /**
   * Success alert
   * @param message - Message to show
   * @param stay  - Stay alert status
   * @param position - Position of alert
   */
  const success = (message: string, stay?: boolean, position?: Position) => alert(message, 'success', stay, position);

  /**
   * Warning alert
   * @param message - Message to show
   * @param stay - Stay alert status
   * @param position - Position of alert
   */
  const warning = (message: string, stay?: boolean, position?: Position) => alert(message, 'warning', stay, position);

  /**
   * Error alert
   * @param message - Message to show
   * @param stay - Stay alert status
   * @param position - Position of alert
   */
  const error = (message: string, stay?: boolean, position?: Position) => alert(message, 'error', stay, position);

  /**
   * Info alert
   * @param message - Message to show
   * @param stay - Stay alert status
   * @param position - Position of alert
   */
  const info = (message: string, stay?: boolean, position?: Position) => alert(message, 'info', stay, position);

  return {
    alert,
    success,
    warning,
    error,
    info,
  };
};
